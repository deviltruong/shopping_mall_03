<?php
namespace Admin\Repository;

use Doctrine\ORM\EntityRepository;
use Application\Entity\Store;

/**
 * This is the custom repository class for Post entity.
 */
class StoreRepository extends EntityRepository
{
    /**
     * Retrieves all published posts in descending date order.
     * @return Query
     */
    public function findStores()
    {
        $entityManager = $this->getEntityManager();
        
        $queryBuilder = $entityManager->createQueryBuilder();
        
        $queryBuilder->select('p')
            ->from(Store::class, 'p');
        
        return $queryBuilder->getQuery();
    }
}