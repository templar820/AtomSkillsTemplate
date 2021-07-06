import {ServerError} from "../middleware/errorHandler";
import SubstancesService from "../services/SubstancesService";

class SubstancesController {
  async getAll(req, res) {
    const substances = await SubstancesService.getAll();
    return res.sendFormat(substances);
  }

}


export default new SubstancesController();