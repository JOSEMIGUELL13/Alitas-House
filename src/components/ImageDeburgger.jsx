import { useImages } from './ImageImports';

const ImageDebugger = () => {
  const images = useImages();
  
  return (
    <div className="fixed top-0 left-0 w-full bg-black/90 p-4 z-50 overflow-x-auto">
      <h2 className="text-white text-xl font-bold mb-4">Available Images</h2>
      
      <div className="flex flex-wrap gap-4">
        {Object.entries(images).map(([key, src]) => (
          <div key={key} className="flex flex-col items-center">
            <img 
              src={src} 
              alt={key} 
              className="h-20 object-contain border border-gray-700 rounded p-1"
            />
            <span className="text-white text-xs mt-1">{key}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-orange-400 text-sm">
        <p>To use these images in your components:</p>
        <pre className="bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
          {`import { useImages } from './ImageImports';
const images = useImages();
<img src={images.alitas3Webp} alt="Alitas" />`}
        </pre>
      </div>
    </div>
  );
};

export default ImageDebugger;