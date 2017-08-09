<?php
namespace Admin\Repository;

use Doctrine\ORM\EntityRepository;
use Application\Entity\Product;

/**
 * This is the custom repository class for Post entity.
 */
class ProductRepository extends EntityRepository
{
    /**
     * Retrieves all published posts in descending date order.
     * @return Query
     */
    public function findProducts()
    {
        $entityManager = $this->getEntityManager();
        
        $queryBuilder = $entityManager->createQueryBuilder();
        
        $queryBuilder->select('p')
            ->from(Product::class, 'p');
        
        return $queryBuilder->getQuery();
    }
}