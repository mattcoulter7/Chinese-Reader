import DAO from './DAO.js';
import ScoreInfoDTO from '../DTOs/ScoreInfoDTO.js';

const ScoreInfoDAO = new DAO('scoreinfo', ScoreInfoDTO);

Window.ScoreInfoDAO = ScoreInfoDAO; // TODO: Remove this... debug only

export default ScoreInfoDAO;