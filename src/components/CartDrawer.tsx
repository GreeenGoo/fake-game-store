import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import { IconButton } from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { Card } from "@/pages/orders/Cart"

export default function CartDrawer() {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          right: 40,
          bottom: 40,
          height: 100,
          width: 100,
          backgroundColor: "white",
          boxShadow: "1px 1px grey"
        }}
        size="large"
      >
        <ShoppingCartIcon sx={{ height: 40, width: 40 }} color="primary" />
      </IconButton>
      <Drawer
        variant={open ? "permanent" : "temporary"}
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
      >
        <Button
          variant="contained"
          onClick={toggleDrawer(false)}
          sx={{ width: 15, height: 50, mb: 2, mt: 1, ml: 1 }}
        >
          <i className="fas fa-times"></i>
        </Button>
        <Box sx={{ width: "60vh" }} role="presentation" onClick={toggleDrawer(false)}>
          <Card />
        </Box>
      </Drawer>
    </>
  )
}
