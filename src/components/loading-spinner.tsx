import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

export default function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
      className="fixed inset-0 bg-white z-50"
    >
      <CircularProgress />
    </Box>
  )
}
