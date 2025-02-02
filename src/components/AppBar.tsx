import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import MUIAppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import AdbIcon from "@mui/icons-material/Adb"
import useUser from "@/context/UserContext"
import { User } from "@/types/User"
import SignUpPanel from "@/pages/authentication/SignUp"
import LoginModal from "../pages/authentication/Login"
import Dialog from "./Dialog"

function AppBar() {
  const [isSignoutModalOpen, setIsSignoutModalOpen] = useState(false)
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { setUser, user } = useUser()
  const openLoginModal = () => setLoginModalOpen(true)
  const closeLoginModal = () => setLoginModalOpen(false)

  const openRegisterModal = () => setRegisterModalOpen(true)
  const closeRegisterModal = () => setRegisterModalOpen(false)

  const handleLogin = (newToken: string, user: User) => {
    localStorage.setItem("authToken", newToken)
    setUser(user)

    if (isLoginModalOpen) {
      closeLoginModal()
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("authToken")
    navigate("/games/active")
  }

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const settings: {
    name: string
    action: () => void
  }[] = user
    ? [
        {
          name: "Profile",
          action: () => navigate("/users/me")
        },
        {
          name: "Sign out",
          action: () => setIsSignoutModalOpen(true)
        }
      ]
    : [
        {
          name: "Login",
          action: openLoginModal
        },
        { name: "Sign up", action: openRegisterModal }
      ]

  const navigation: {
    name: string
    href: string
    current: boolean
    isAccessable: boolean
  }[] = [
    { name: "All games", href: "/games/all", current: true, isAccessable: user?.role === "ADMIN" },
    { name: "Active games", href: "/games/active", current: false, isAccessable: true },
    {
      name: "My orders",
      href: "/users/me/orders",
      current: false,
      isAccessable: user?.role === "USER"
    },
    { name: "All orders", href: "/orders", current: false, isAccessable: user?.role === "ADMIN" }
  ]

  return (
    <>
      <MUIAppBar position="static" sx={{ backgroundColor: "black" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {navigation.map((item) => {
                  if (!item.isAccessable) {
                    return null
                  }
                  const current = location.pathname.includes(item.href)
                  return (
                    <MenuItem
                      key={item.name}
                      onClick={() => {
                        handleCloseNavMenu()
                        navigate(item.href)
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          borderBottom: 1,
                          borderBottomColor: current ? "black" : "white"
                        }}
                      >
                        {item.name}
                      </Typography>
                    </MenuItem>
                  )
                })}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {navigation.map((item) => {
                if (!item.isAccessable) {
                  return null
                }
                const current = location.pathname.includes(item.href)

                return (
                  <Button
                    key={item.name}
                    onClick={() => {
                      handleCloseNavMenu()
                      navigate(item.href)
                    }}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      borderBottom: 1,
                      borderBottomColor: current ? "white" : "black",
                      borderRadius: 0
                    }}
                  >
                    {item.name}
                  </Button>
                )
              })}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User">{user?.name.slice(0, 1)}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => {
                      handleCloseUserMenu()
                      setting.action()
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </MUIAppBar>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} onLogin={handleLogin} />
      <SignUpPanel
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        onRegister={handleLogin}
      />
      <Dialog
        open={isSignoutModalOpen}
        handleClose={() => setIsSignoutModalOpen(false)}
        title={"Are you sure that you want to logout?"}
        handleComfirm={() => {
          setIsSignoutModalOpen(false)
          handleLogout()
        }}
      />
    </>
  )
}
export default AppBar
