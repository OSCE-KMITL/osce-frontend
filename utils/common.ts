export function studentIdParser(email: string) {
    try {
        const extracted = email.split('@');
        return extracted[0];
    } catch (error) {
        console.log('cant not parse this email');
    }
}
