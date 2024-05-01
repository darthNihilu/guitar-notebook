"use server";
export const getEnv = async () => ({
	DOCKER_MY_ENV: process.env.BASE_API_URI,
});
