import express from 'express'
import { facilityController } from './facility.controller'
import validateRequest from '../../middleware/validateRequest'
import { facilityZodSchemaFile } from './facility.validation'
import { auth } from '../../middleware/auth'

const router = express.Router()
// auth(["user"])
router.get('/', facilityController.getAllFacilities)
router.post('/', auth(["admin"]),validateRequest(facilityZodSchemaFile.facilityZodSchema),facilityController.createFacility)
router.put('/:id', auth(["admin"]), facilityController.updateAFacility)
router.delete('/:id', auth(["admin"]),facilityController.deleteAFacility)

export const facilityRoutes = router 