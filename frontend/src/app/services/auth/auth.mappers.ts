import { MeResponse, User } from '../../models/auth.model';

/**
 * Maps the backend profile payload into the local user model.
 */
export const mapMeToUser = (response: MeResponse): User => ({
  id: response.id,
  name: response.name,
  email: response.email,
  createdAt: response.createdAt ? new Date(response.createdAt) : undefined,
});
