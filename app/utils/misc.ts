export async function toFormData<T>(request: Request): Promise<T> {
  const data: FormData = await request.formData();
  return Object.fromEntries((data as any).entries()) as T;
}
