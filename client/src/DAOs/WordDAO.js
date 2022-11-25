import DAO from './DAO.js';
import WordDTO from './../DTOs/WordDTO.js'

const WordDAO = new DAO('word', WordDTO);

Window.WordDAO = WordDAO; // TODO: Remove this... debug only

export default WordDAO;