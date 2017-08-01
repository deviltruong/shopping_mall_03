<?php
namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Application\Entity\Comment;
use Application\Entity\Keyword;
use Application\Entity\Product_image;
use Application\Entity\Rate;
/**
 * @ORM\Entity
 * @ORM\Table(name="products")
 */
class Product
{
     /**
     * @ORM\OneToMany(targetEntity="\Application\Entity\Comment", mappedBy="products")
     * @ORM\JoinColumn(name="id", referencedColumnName="product_id")
     */
    protected $comments;

    /**
     * @ORM\ManyToMany(targetEntity="\Application\Entity\Keyword", inversedBy="products")
     * @ORM\JoinTable(name="product_keyword",
     *      joinColumns={@ORM\JoinColumn(name="product_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="keyword_id", referencedColumnName="id")}
     *      )
     */
    protected $keywords;

    /**
     * @ORM\OneToMany(targetEntity="\Application\Entity\Product_image", mappedBy="products")
     * @ORM\JoinColumn(name="id", referencedColumnName="product_id")
     */
    protected $product_images;

    /**
     * @ORM\OneToMany(targetEntity="\Application\Entity\Rate", mappedBy="products")
     * @ORM\JoinColumn(name="id", referencedColumnName="product_id")
     */
    protected $rates;
      
    /**
     * Constructor.
     */
    public function __construct() 
    {
        $this->comments = new ArrayCollection();
        $this->keywords = new ArrayCollection();
        $this->product_images = new ArrayCollection(); 
        $this->rates = new ArrayCollection();                    
    }
      
    /**
     * Returns comments for this product.
     * @return array
     */
    public function getComments() 
    {
        return $this->comments;
    }
      
    /**
     * Adds a new comment to this product.
     * @param $comment
     */
    public function addComment($comment) 
    {
        $this->comments[] = $comment;
    }

    /**
     * Returns rates for this product.
     * @return array
     */
    public function getRates() 
    {
        return $this->rates;
    }
      
    /**
     * Adds a new rate to this product.
     * @param $rate
     */
    public function addRate($rate) 
    {
        $this->rates[] = $rate;
    }

    protected $product_images;
      
    /**
     * Returns product_images for this product.
     * @return array
     */
    public function getProductImages() 
    {
        return $this->product_images;
    }
      
    /**
     * Adds a new product_image to this product.
     * @param $product_image
     */
    public function addProductImage($product_image) 
    {
        $this->product_images[] = $product_image;
    }


    // Returns keywords for this product.
    public function getKeywords() 
    {
        return $this->keywords;
    }      
      
    // Adds a new keyword to this product.
    public function addKeyword($keyword) 
    {
        $this->keywords[] = $keyword;        
    }
      
    // Removes association between this product and the given keyword.
    public function removeKeywordAssociation($keyword) 
    {
        $this->keywords->removeElement($keyword);
    }

    /**
     * @ORM\ManyToOne(targetEntity="\Application\Entity\Store", inversedBy="products")
     * @ORM\JoinColumn(name="store_id", referencedColumnName="id")
     */
    protected $store;
       
    /*
     * Returns associated store.
     * @return \Application\Entity\Store
     */
    public function getStore() 
    {
        return $this->store;
    }
      
    /**
     * Sets associated store.
     * @param \Application\Entity\Store $store
     */
    public function setStore($store) 
    {
        $this->store = $store;
        $store->addProduct($this);
    }

    /**
     * @ORM\ManyToOne(targetEntity="\Application\Entity\Category", inversedBy="products")
     * @ORM\JoinColumn(name="category_id", referencedColumnName="id")
     */
    protected $category;
       
    /*
     * Returns associated category.
     * @return \Application\Entity\Category
     */
    public function getCategory() 
    {
        return $this->category;
    }
      
    /**
     * Sets associated category.
     * @param \Application\Entity\Category $category
     */
    public function setCategory($category) 
    {
        $this->category = $category;
        $category->addProduct($this);
    }
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(name="id")
     */
    protected $id;

    /**
     * @ORM\Column(name="name")
     */
    protected $name;

    /**
     * @ORM\Column(name="alias")
     */
    protected $alias;

    /**
     * @ORM\Column(name="price")
     */
    protected $price;

    /**
     * @ORM\Column(name="intro")
     */
    protected $intro;

    /**
     * @ORM\Column(name="image")
     */
    protected $image;

    /**
     * @ORM\Column(name="description")
     */
    protected $description;

    /**
     * @ORM\Column(name="status")
     */
    protected $status;

    /**
     * @ORM\Column(name="rate_avg")
     */
    protected $rate_avg;

    /**
     * @ORM\Column(name="rate_count")
     */
    protected $rate_count;

    /**
     * @ORM\Column(name="sale")
     */
    protected $sale;

    // Returns ID of this product.
    public function getId() 
    {
        return $this->id;
    }

    // Sets ID of this product.
    public function setId($id) 
    {
        $this->id = $id;
    }

    public function getName() 
    {
        return $this->name;
    }

    public function setName($name) 
    {
        $this->name = $name;
    }

    public function getAlias() 
    {
        return $this->alias;
    }

    public function setAlias($alias) 
    {
        $this->alias = $alias;
    }

    public function getPrice() 
    {
        return $this->price;
    }

    public function setPrice($price) 
    {
        $this->price = $price;
    }

    public function getIntro() 
    {
        return $this->intro;
    }

    public function setIntro($intro) 
    {
        $this->intro = $intro;
    }

    public function getImage() 
    {
        return $this->image;
    }

    public function setImage($image) 
    {
        $this->image = $image;
    }

    public function getDescription() 
    {
        return $this->description;
    }

    public function setDescription($description) 
    {
        $this->description = $description;
    }

    public function getStatus() 
    {
        return $this->status;
    }

    public function setStatus($status) 
    {
        $this->status = $status;
    }

    public function getRate_avg() 
    {
        return $this->rate_avg;
    }

    public function setRate_avg($rate_avg) 
    {
        $this->rate_avg = $rate_avg;
    }

    public function getRate_count() 
    {
        return $this->rate_count;
    }

    public function setRate_count($rate_count) 
    {
        $this->rate_count = $rate_count;
    }

    public function getSale() 
    {
        return $this->sale;
    }

    public function setSale($sale) 
    {
        $this->sale = $sale;
    }
}
