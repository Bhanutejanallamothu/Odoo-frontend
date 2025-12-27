'use server';

/**
 * @fileOverview AI-powered assistant to suggest maintenance teams and technicians for maintenance requests.
 *
 * - suggestMaintenanceAssignment - A function that suggests the maintenance team and technician for a given piece of equipment.
 * - SuggestMaintenanceAssignmentInput - The input type for the suggestMaintenanceAssignment function.
 * - SuggestMaintenanceAssignmentOutput - The return type for the suggestMaintenanceAssignment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMaintenanceAssignmentInputSchema = z.object({
  equipmentName: z.string().describe('The name of the equipment.'),
  equipmentType: z.string().describe('The type of the equipment.'),
  requestType: z.string().describe('The type of the maintenance request (Corrective or Preventive).'),
});
export type SuggestMaintenanceAssignmentInput = z.infer<typeof SuggestMaintenanceAssignmentInputSchema>;

const SuggestMaintenanceAssignmentOutputSchema = z.object({
  maintenanceTeam: z.string().describe('The suggested maintenance team.'),
  technician: z.string().describe('The suggested technician.'),
});
export type SuggestMaintenanceAssignmentOutput = z.infer<typeof SuggestMaintenanceAssignmentOutputSchema>;

export async function suggestMaintenanceAssignment(
  input: SuggestMaintenanceAssignmentInput
): Promise<SuggestMaintenanceAssignmentOutput> {
  return suggestMaintenanceAssignmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMaintenanceAssignmentPrompt',
  input: {schema: SuggestMaintenanceAssignmentInputSchema},
  output: {schema: SuggestMaintenanceAssignmentOutputSchema},
  prompt: `You are an AI assistant that suggests the appropriate maintenance team and technician for a maintenance request, based on the equipment's history, type, and the request type.

  Given the following information, suggest the most suitable maintenance team and technician:

  Equipment Name: {{{equipmentName}}}
  Equipment Type: {{{equipmentType}}}
  Request Type: {{{requestType}}}

  Consider the equipment's maintenance history, the expertise of different teams and technicians, and the type of maintenance required.
  If the request type is "Preventive", return team and technician that usually work on preventive maintenance of this equipment type.
  If the request type is "Corrective", return team and technician that have done corrective maintenance on similar equipment in the past.
  `,
});

const suggestMaintenanceAssignmentFlow = ai.defineFlow(
  {
    name: 'suggestMaintenanceAssignmentFlow',
    inputSchema: SuggestMaintenanceAssignmentInputSchema,
    outputSchema: SuggestMaintenanceAssignmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
