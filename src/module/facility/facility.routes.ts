import express from 'express'
import { facilityController } from './facility.controller'
import validateRequest from '../../middleware/validateRequest'
import { facilityZodSchemaFile } from './facility.validation'
import { verifyToken } from '../../middleware/varifyToken'
import { verifyAdmin } from '../../middleware/verifyAdmin'

const router = express.Router()

router.post('/',validateRequest(facilityZodSchemaFile.facilityZodSchema),facilityController.createFacility)
router.get('/' ,facilityController.getAllFacilities)
router.put('/:id',verifyToken, verifyAdmin, facilityController.updateAFacility)
router.delete('/:id', verifyToken, verifyAdmin,facilityController.deleteAFacility)

export const facilityRoutes = router 