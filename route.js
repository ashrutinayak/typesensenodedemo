const  Router = require('express');
const collectionCreate = require('./typesenseCollection');
const collectionSearch = require('./typesenseCollectionData');
const router = Router()

router.get('collection', collectionCreate.collectionCreate);
router.get('search', collectionSearch.search);
router.get('/searchML', collectionSearch.searchML)

module.exports = router;