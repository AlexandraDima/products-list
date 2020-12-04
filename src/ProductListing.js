import React, {Component} from 'react';
import Data from './data.json';
import './App.css';
import ProductDescription from './components/ProductDescription.js';


class ProductListing extends Component{
    constructor(props){  
        super(props);  
        this.state = {  
             products: [],
             categories:Data.categories,
             showModal:false
          }  
        }
        componentDidMount(){
            this.setProductsState()
        } 
      
        iterateImages=(product)=>{
            for (const p in product){
               return product[p];
            }
        }
        filterProducts=(option)=>{
         //  this.state.products.filter((product) =>  console.log(product.categories===option))
           console.log(option);
               if(option){
                   this.setState({
                       products: this.state.products.filter(product => product.brand === option /* || 
                        product.categories.filter((cat)=>cat === option) */)
                   })
               } else{
                   this.setState({
                       products:Data.products
                   })
               } 
           }
        setProductsState=()=>{
            this.setState({
                products:Data.products 
            })
        }
        showModalFunction = (id) => {
            this.setState({
                products:this.state.products.filter((product) => product.id === id ),
                showModal: true
            })
      
        }
        //method to close the Modal/Button
        closeModal = () =>{
            this.setState({showModal:false})
        }

    render(){
    
        return(
            <div className="row mt-5">
            <div className="row mb-3 mx-auto ">
           
                <div className="dropdown">
                <button className="btn bg-dark text-white mr-3" onClick={this.setProductsState}>All</button>
                            <button className="btn bg-dark text-white dropdown-toggle mr-3" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                brands
                            </button>
                                 <div div className="dropdown-menu"  aria-labelledby="dropdownMenuButton">
                                 <button className="dropdown-item"  onClick={() => {this.filterProducts('Vero Moda');}}>Vero Moda</button>
                                 <button className="dropdown-item"  onClick={() => {this.filterProducts('Jack & Jones');}}>Jack & Jones</button>
                                 <button className="dropdown-item"  onClick={() => {this.filterProducts('name it');}}>name it</button>
                                    </div>
                           
                </div>
              
                {
                    this.state.categories.categories.map((categoryId) =>{
                        return(
                            <div className="dropdown" key={categoryId.id}>
                            <button className="btn dropdown-toggle bg-dark text-white mr-3" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=>this.filterProducts(categoryId.id)}>
                                {categoryId.id}
                            </button>
                             {
                                 (typeof(categoryId.categories)==='object') ?
                                 <div div className="dropdown-menu"  aria-labelledby="dropdownMenuButton">
                                     {
                                    categoryId.categories.map((subCategory, k)=>
                                    {
                                        //console.log(subCategory.id);
                                    return(
                                       <div>
                                        <button key={k} className="dropdown-item" onClick={()=>this.filterProducts(subCategory.id)}>{subCategory.id}
                                       <ul>
                                               {
                                                (typeof(subCategory.categories)=='object') ?
                                                <div>
                                                    {
                                                        subCategory.categories.map((subSubCategory,m)=>{
                                                            //console.log(subSubCategorie.id);
                                                            return(<button key={m} onClick={()=>this.filterProducts(subSubCategory.id)}>{subSubCategory.id}</button>)
                                                        })
                                                    }
                                                </div>
                                                :
                                                null
                                               }
                                       </ul>
                                        
                                        </button>
                                    </div>
                                    )
                                    })
                                     }
                               
                                </div>
                                :
                                null
                            } 
                           
                        </div>
                        )
                    } 
              
                    )
                }

        
            </div>
            <div className="row mx-auto mt-5">
                {
                this.state.products.map((item) => { 
                    return(
            
                    <div key={item.id}  className="text-center col-lg-4">
                             <img className="imgPr" src={`${this.iterateImages(item.images)}`} alt='productImage'/> 
                        <div>
                            <h6>{item.name.dk || item.name.en}</h6>
                            <p>{item.price}</p>
                            <button className="btn  bg-secondary text-white" onClick={()=>this.showModalFunction(item.id)}>View</button>
                        </div>
                       
                          {
                          (typeof(item.images)==='object') ?
                         <div>
                              {
                                  item.images.map((img, a)=>{
                                      return( <ProductDescription  show={this.state.showModal} clicked={this.closeModal} id={a} image={img} />)
                                  })
                              } 
                         </div>
                        
                         :
                         null
                         
                         } 
                      
                       
                       </div>
                    )
                    
                    
                     })
                }
               </div>
            </div>
        )
            
    }
}
export default ProductListing;