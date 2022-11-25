import DAO from './DAO.js';
import UserFlashCardDTO from '../DTOs/UserFlashCardDTO.js';

const UserFlashCardDAO = new DAO('userflashcard', UserFlashCardDTO);

Window.UserFlashCardDAO = UserFlashCardDAO; // TODO: Remove this... debug only

export default UserFlashCardDAO;