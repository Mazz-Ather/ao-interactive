import { Blog7 } from "@/app/components/ui/blog7";
// import "./blog7-custom.css"; // create this CSS file

const demoData = {
  tagline: "Latest Updates",
  heading: "Blog Posts",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
  buttonText: "Explore all posts",
  buttonUrl: "https://www.shadcnblocks.com",
  posts: [
    {
      id: "post-1",
      title: " Immersive Technology for Business & Industry",
      summary:
        "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
      label: "Ut varius dolor turpis",
      author: "Jane Doe",
      published: "1 Jan 2024",
      url: "hcnblocks.com",
      image: "https://img.freepik.com/free-photo/manager-supervisor-worker-discussing-about-production-results-new-strategy-factory-industrial-hall_342744-112.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      id: "post-2",
      title: "Architectural & Product Visualization",
      summary:
        "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
      label: "Ut varius dolor turpis",
      author: "Jane Doe",
      published: "1 Jan 2024",
      url: "hcnblocks.com",
      image: "https://cdn.prod.website-files.com/5894a32730554b620f7bf36d/643816dd7651ff160b953649_60797b5da472d6a448491a3a_3D%2520Architectural%2520Visualization%2520The%2520Future%2520of%2520Construction%2520and%2520Architecture%2520EASY%2520RENDER.jpeg",
    },
    {
      id: "post-3",
      title: " Creative Content & Digital Storytelling",
      summary:
        "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
      label: "Ut varius dolor turpis",
      author: "Jane Doe",
      published: "1 Jan 2024",
      url: "hcnblocks.com",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT27aIiMfsOTc_O8VU6y9qbAYrSoDegGjkL5w&s",
    },
  ],
};

function Blog() {
  return (
    <div className="blog7-brand-colors">
      <Blog7 {...demoData} />
    </div>
  );
}

export { Blog };
