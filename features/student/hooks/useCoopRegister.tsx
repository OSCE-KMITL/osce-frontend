import { useMutation, gql } from '@apollo/client';
import { RegisterCoopPayload } from '../interfaces';

export const REGISTER_COOP = gql`
    mutation studentRegisterCoop($registerCoopInput: CoopRegisterArgs!, $languageAbilities: [LanguageAbility!], $skills: [Skill!], $transcriptFile: Upload!) {
        studentRegisterCoop(
            register_coop_input: $registerCoopInput
            language_abilities: $languageAbilities
            skills: $skills
            transcript_file: $transcriptFile
        ) {
            student_id
        }
    }
`;
export const useCoopRegister = () => {
    return useMutation<any, RegisterCoopPayload>(REGISTER_COOP);
};
