<?php
namespace Application\Service;

use Application\Entity\Product;

use Zend\Filter\StaticFilter;

// The UserManager service is responsible for adding new posts.
class ProductManager
{
    /**
     * Doctrine entity manager.
     * @var Doctrine\ORM\EntityManager
     */
    private $entityManager;

    // Constructor is used to inject dependencies into the service.
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }
}
