export default function validate(...args: any) {
  const validate = [...args];

  return validate.every((v) => v);
}
