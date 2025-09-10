// "use client"

// import { DynamicFrameLayout } from "@/app/components/ui/dynamic-frame-layout"

// const demoFrames = [
//   {
//     id: 1,
//     video: "/videos/DG.mp4",
//     defaultPos: { x: 0, y: 0, w: 4, h: 4 },
//     mediaSize: 1,
//     isHovered: false,
//   },
//   {
//     id: 2,
//     video: "/videos/DS.mp4",
//     defaultPos: { x: 4, y: 0, w: 4, h: 4 },
//     mediaSize: 1,
//     isHovered: false,
//   },
//   {
//     id: 3,
//     video: "https://static.cdn-luma.com/files/58ab7363888153e3/Jitter%20Exported%20Poster.mp4",
//     defaultPos: { x: 8, y: 0, w: 4, h: 4 },
//     mediaSize: 1,
//     isHovered: false,
//   },
//   {
//     id: 4,
//     video: "https://static.cdn-luma.com/files/58ab7363888153e3/Exported%20Web%20Video.mp4",
//     defaultPos: { x: 0, y: 4, w: 4, h: 4 },
//     mediaSize: 1,
//     isHovered: false,
//   },
//   {
//     id: 5,
//     video: "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4",
//     defaultPos: { x: 4, y: 4, w: 4, h: 4 },
//     mediaSize: 1,
//     isHovered: false,
//   },
//   {
//     id: 6,
//     video: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
//     defaultPos: { x: 8, y: 4, w: 4, h: 4 },
//     mediaSize: 1,
//     isHovered: false,
//   },
//   {
//     id: 7,
//     video: "https://static.cdn-luma.com/files/58ab7363888153e3/Illustration%20Exported%20(1).mp4",
//     defaultPos: { x: 0, y: 8, w: 4, h: 4 },
//     mediaSize: 1,
//     isHovered: false,
//   },
//   {
//     id: 8,
//     video: "https://static.cdn-luma.com/files/58ab7363888153e3/Art%20Direction%20Exported.mp4",
//     defaultPos: { x: 4, y: 8, w: 4, h: 4 },
//     mediaSize: 1,
//     isHovered: false,
//   },
//   {
//     id: 9,
//     video: "https://static.cdn-luma.com/files/58ab7363888153e3/Product%20Video.mp4",
//     defaultPos: { x: 8, y: 8, w: 4, h: 4 },
//     mediaSize: 1,
//     isHovered: false,
//   },
// ]

// export function WhyChooseUs() {
//   return (
//     <div className="min-h-screen w-screen bg-black">
//       {/* Header Section */}
//       <div className="text-center py-12">
//         <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
//           Why Choose Us
//         </h1>
//         <p className="text-xl text-zinc-300 max-w-3xl mx-auto px-6 leading-relaxed">
//           Discover our innovative approach through interactive media that showcases 
//           our expertise in creating exceptional digital experiences and cutting-edge solutions.
//         </p>
//       </div>
      
//       {/* Dynamic Frame Layout */}
//       <div className="h-screen">
//         <DynamicFrameLayout 
//           frames={demoFrames.map(frame => ({

//             ...frame,
//             corner: 0,
//             edgeHorizontal: 0,
//             edgeVertical: 0, 
//             borderThickness: 1,
//             borderSize: 1
//           }))}
//           className="w-full h-full" 
//           hoverSize={6}
//           gapSize={4}
//         />
//       </div>
//     </div>
//   )
// }