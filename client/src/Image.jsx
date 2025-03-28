export default function Image({ src, ...rest }) {
  console.log("Original src:", src); // Debugging log

  // If src is an object with a `path` property, extract it
  if (src && typeof src === "object" && src.path) {
    src = src.path;
  }

  // Ensure src is a string
  if (Array.isArray(src)) {
    src = src[0] || "";
  } else if (typeof src !== "string") {
    src = "";
  }

  // Fix: Ensure the path starts with a single `/` when appending to localhost
  if (!src.startsWith("https://") && !src.startsWith("http://")) {
    // Make sure there is exactly one `/` before "uploads"
    if (!src.startsWith("/")) {
      src = `/${src}`;
    }
    src = `http://localhost:4000${src}`;
  }

  console.log("Final image src:", src); // Debugging log

  return (
    <img
      {...rest}
      src={src}
      alt="Image"
      onError={(e) => {
        console.error("Image failed to load:", e.target.src);
        e.target.src = "https://via.placeholder.com/150"; // Fallback image
      }}
    />
  );
}
