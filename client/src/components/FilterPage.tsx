import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export type IFilterOptions={
  id:string;
  label:string;
}
const filterOptions:IFilterOptions[]=[
  {
    id:"burger",
    label:"Burger"
  },
  {
    id: "thali",
    label: "Thali"
  },
  {
    id: "biryani",
    label: "Biryani"
  }, {
    id: "momos",
    label: "Momos"
  },
]

const FilterPage = () => {
  const appliedFilterHandler=(value:string)=>{
    // alert(value);
  }
  return (
    <div className="md:w-72">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-lg">Filter by cuisines</h1>
          <Button variant={"link"}>Reset</Button>
        </div>
        {
          filterOptions.map((option)=>(
            <div key={option.id} className="flex items-center space-x-2 my-5">
                  <Checkbox 
                    id={option.id}
                    onClick={()=> appliedFilterHandler(option.label)}
                  />
                  <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{option.label}</Label>
            </div>
          ))
        }
    </div>
  )
}

export default FilterPage