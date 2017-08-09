<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Application\Entity\Category;
use Zend\Mvc\MvcEvent;

class CategoryController extends AbstractActionController
{
	/**
     * Entity manager.
     * @var
     */
    private $entityManager;
    private $categoryManager;
    private $productManager;

    public function __construct($entityManager, $categoryManager, $productManager)
    {
        $this->entityManager = $entityManager;
        $this->categoryManager = $categoryManager;
        $this->productManager = $productManager;
        
    }

    //set layout for all action
    public function onDispatch(MvcEvent $e) 
    {
    // Call the base class' onDispatch() first and grab the response
    $response = parent::onDispatch($e);        
    
    // Set alternative layout
    $this->layout()->setTemplate('application/layout');                
    
    // Return the response
    return $response;
    }

    public function viewAction()
    {	
    	return new ViewModel();
    }


}