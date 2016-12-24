export default function authorize (root) {
  if (!root.user) {
    throw new Error('Unauthorized');
  }
}
