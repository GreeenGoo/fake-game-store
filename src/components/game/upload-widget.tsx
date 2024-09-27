// import { useEffect, useRef } from "react"

// const UploadWidget = () => {
//   const cloudinaryRef = useRef<any>(null)
//   const widgetRef = useRef<any>(null)

//   useEffect(() => {
//     if (window.cloudinary) {
//       cloudinaryRef.current = window.cloudinary

//       widgetRef.current = cloudinaryRef.current.createUploadWidget(
//         {
//           cloudName: "dtoob7izs",
//           uploadPreset: "mnwp705b"
//         },
//         (error: any, result: any) => {
//           if (error) {
//             console.error("Upload failed: ", error)
//             return
//           }
//           if (result && result.event === "success") {
//             console.log("Upload successful: ", result.info)
//           } else {
//             console.log("Unexpected result: ", result)
//           }
//         }
//       )
//     } else {
//       console.error("Cloudinary is not loaded")
//     }
//   }, [])

//   return (
//     <button
//       type="button"
//       onClick={(event) => {
//         event.preventDefault()
//         widgetRef.current?.open()
//       }}
//     >
//       Upload
//     </button>
//   )
// }

// export default UploadWidget
