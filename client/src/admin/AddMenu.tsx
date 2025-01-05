import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { FormEvent, useState } from "react"
import Images from "@/assets/hero_pizza.png"
import EditMenu from "./EditMenu";
import { MenuFormSchema } from "@/schema/menuSchema";


const menus=[
    {
    name:"Biryani",
    description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa temporibus voluptatum, nihil facilis placeat hic tempore doloremque deleniti est neque odio, minima beatae, deserunt mollitia vitae quam. Cum, voluptatibus molestiae.",
    price:"80",
    image:"Images"
    }
    ,
    {
        name: "Biryani",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa temporibus voluptatum, nihil facilis placeat hic tempore doloremque deleniti est neque odio, minima beatae, deserunt mollitia vitae quam. Cum, voluptatibus molestiae.",
        price: "80",
        image: "Images"
    }
]

const AddMenu = () => {
    const [input, setInput]=useState<MenuFormSchema>({
        name: "",
        description: "",
        price: 0,
        image: undefined
    }) 
    const [open, setOpen]= useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);


    const loading=false;
    const [selectedMenu,setSelectedMenu]=useState<any>();

    const changeEventHandler=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value, type } = e.target;
        setInput({ ...input, [name]: type === 'number' ? Number(value) : value }); 
    }
    const submitHandler=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(input);
    }
  return (
    <div className="max-w-6xl mx-auto my-10">
       <div className="flex justify-between">
         <h1 className="font-bold md:font-extrabold text-lg md:text-2xl" >Available Menus</h1>
       
       <Dialog  open={open} onOpenChange={setOpen} >
            <DialogTrigger >
                <Button className="bg-orange hover:bg-hoverOrange">
                     <Plus className="mr-2" /> Add Menu
                     </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add A New Menu</DialogTitle>
                    <DialogDescription>
                        Create a menu that will make your restaurant stand out.
                    </DialogDescription> 
                </DialogHeader>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <Label>Name</Label>
                       <Input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={changeEventHandler}
                        placeholder="Enter menu name"
                       />
                    </div>
                      <div>
                          <Label>Description</Label>
                          <Input
                              type="text"
                              name="description"
                                  value={input.description} 
                                  onChange={changeEventHandler}
                              placeholder="Enter menu description"
                          />
                      </div>
                      <div>
                          <Label>Price in (Rupees)</Label>
                          <Input
                              type="number"
                              name="price"
                              value={input.price}
                                  onChange={changeEventHandler}
                              placeholder="Enter menu price"
                          />
                      </div>
                      <div>
                          <Label>Uplaod Menu Image</Label>
                          <Input
                                  onChange={(e) => setInput({ ...input, image: e.target.files?.[0] || undefined })}
                                  type="file"
                                  accept="image/*"
                                  name="image"
                                  
                             
                          />
                      </div>
                      <DialogFooter className="mt-5">
                          
                              {
                                  loading ? (
                                      <Button disabled className="bg-orange hover:bg-hoverOrange">
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          Please wait
                                      </Button>
                                  ) : (

                                      <Button className="bg-orange hover:bg-hoverOrange">
                                          Submit

                                      </Button>
                                  )
                              }
                          
                      </DialogFooter>
                </form>
            </DialogContent>
       </Dialog>
          </div>
          {
            menus.map((menu:any,idx:number)=>(

          <div key={idx} className="mt-6 spac-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md  rounded-lg border">
                      <img src={Images} alt="pizza"
                      className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h1 className="text-lg font-semibold text-gray-800">{menu.name}</h1>
                        <p className="text-sm text-gray-600 mt-1" >{menu.description}</p>
                        <h2 className="text-md font-semibold mt-2">
                            Price : <span className="text-[#D19254]">{menu.price}</span>
                        </h2>
                      </div>
                     
                      <Button
                      onClick={()=>{
                        setSelectedMenu(menu);
                        setEditOpen(true);
                    }
                      }
                       size={'sm'} className="bg-orange hover:bg-hoverOrange mt-2">Edit</Button>
                     
            </div>
          </div>
            ))
          }
          <EditMenu selectedMenu={selectedMenu} editOpen={editOpen} setEditOpen={setEditOpen} />
    </div>
  )
}

export default AddMenu