import { signUp, logIn } from '../services/authService.js';

export async function signUpHandler(req, res) {
  const { email, password, role } = req.body;
  const user = await signUp(email, password, role);
  res.status(201).json(user);
}

export async function logInHandler(req, res) {
  const { email, password } = req.body;
  const token = await logIn(email, password);
  res.status(200).json({ token });
}