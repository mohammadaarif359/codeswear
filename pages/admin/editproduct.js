import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import {
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";

const EditProduct = () => {
  const router = useRouter();
  console.log('id',router.query.id)
  const [productId,setProductId] = useState('')
  const [form,setForm] = useState({})
  
  // handleChange
  const handleChange =(e)=>{
	  setForm({
		...form,
	    [e.target.name]:e.target.value		
	  })
	  console.log(form)
  }
  useEffect(() => {
	setProductId(router.query.id)  
	const fetchProductData = async() =>{
	  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getproduct`,{
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({id:router.query.id})
      });  
      res = await res.json();
	  const product = res.data;
	  if(product) {
		  setForm({
			 _id:productId,
			 title:product.title,
			 slug:product.slug,
			 category:product.category,
			 color:product.color,
			 size:product.size,
			 availableQty:product.availableQty,
			 price:product.price,
			 desc:product.desc
		  })
	  }	  
    }
	fetchProductData();
  }, [router]); 	
  // handleSubmit
  const handleSubmit = async(e) =>{
	e.preventDefault();
	let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateproducts`,{
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify([form])
    });  
    res = await res.json();
	if(res.success) {
		router.push('/admin/allproducts')
		alert(res.success);
	} else {
		alert(res.error);
	}
  }
  return (
    <ThemeProvider theme={theme}>
	  <FullLayout>
		<Grid container spacing={0}>
		  <Grid item xs={12} lg={12}>
			<BaseCard title="Edit Product">
			  <Stack spacing={3}>
			    <TextField type='hidden' onChange={handleChange} value={form._id ? form._id : ''} name="_id" label="" variant="outlined" />
				<TextField onChange={handleChange} value={form.title ? form.title : ''} name="title" label="Title" variant="outlined" />
				<TextField onChange={handleChange} value={form.slug ? form.slug : ''} name="slug" label="Slug" variant="outlined" />
				<TextField onChange={handleChange} value={form.category ? form.category : ''} name="category" label="Category" variant="outlined" />
				<TextField onChange={handleChange} value={form.price ? form.price : ''} name="price" label="Price" variant="outlined" />
				<TextField onChange={handleChange} value={form.availableQty ? form.availableQty : ''} name="availableQty" label="Available Qty" variant="outlined" />
				<TextField onChange={handleChange} value={form.size ? form.size : ''} name="size" label="Size" variant="outlined" />
				<TextField onChange={handleChange} value={form.color ? form.color : ''} name="color" label="Color" variant="outlined" />
				<TextField onChange={handleChange}
				  value={form.desc ? form.desc : ''} name="desc"
				  label="Description"
				  multiline
				  rows={4}
				/>
			  </Stack>
			  <br />
			  <Button onClick={handleSubmit} variant="outlined" mt={2}>
				Submit
			  </Button>
			</BaseCard>
		  </Grid>
		</Grid>
	  </FullLayout>
	</ThemeProvider>
  )	
}

export default EditProduct