import { useMutation, gql } from '@apollo/client';
import { RegisterCoopPayload } from '../interfaces';

export const REGISTER_COOP = gql`
    mutation StudentRegisterCoop($registerCoopInput: CoopRegisterArgs!, $skills: [Skill!], $languageAbilities: [LanguageAbility!]) {
        studentRegisterCoop(register_coop_input: $registerCoopInput, skills: $skills, language_abilities: $languageAbilities) {
            student_id
        }
    }
`;
export const useCoopRegister = () => {
    return useMutation<any, RegisterCoopPayload>(REGISTER_COOP);
};
