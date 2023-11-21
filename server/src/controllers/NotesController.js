import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";

export class NotesController extends BaseController {
    constructor() {
        super('api/notes')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createNote)
            .delete('/:noteId', this.removeNote)
    }

    async createNote(req, res, next) {
        try {
            const noteData = req.body
            noteData.creatorId = req.userInfo.id
            const note = await notesService.createNote(noteData)
            return res.send(note)
        } catch (error) {
            next(error)
        }
    }

    async removeNote(req, res, next) {
        try {
            const noteId = req.params.noteId
            const userId = req.userInfo.id
            await notesService.removeNote(noteId, userId)
            return res.send('Note has been deleted')
        } catch (error) {
            next(error)
        }
    }
}