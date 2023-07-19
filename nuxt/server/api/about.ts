export default defineEventHandler(
    async (event): Promise<string> => {
        return new Date().toString();
    },
);
