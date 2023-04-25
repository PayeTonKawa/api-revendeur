# api-revendeur

## routes API revendeur

### sessions :
    - [GET] /api/sessions/{email} -  renvoi soit token soit erreur si expiré ou existe pas
    - [POST] /api/sessions/{email} - créer token et renvoi code 200
### products :
    - [GET] /api/products/ - renvoi la liste de tout les produits
    - [GET] /api/products/{id} - renvoi un produit spécifique
### stock :
    - [GET] /api/stocks/ - renvoi la quantité des stocks pour l'ensemble des produits
    - [GET] /api/stocks/{id} - renvoi la quantité des stocks pour un produit spécifique
### order :
    - [GET] /api/orders - renvoi la liste de toutes les commandes
    - [GET] /api/orders/{id} - renvoi une commande spécifique
