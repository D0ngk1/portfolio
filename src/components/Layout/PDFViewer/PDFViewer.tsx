import Windows from "@/components/UI/Windows.tsx";
import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfFile from "@/assets/Resume_SE_DarylG.pdf";
import "./PDFViewer.css";

interface ProjProps {
  sendCloseB?: (isClose?:boolean) => void;  
  sendMaxB?: (isMax?:boolean) => void;
  sendMinz?: (isMinz?:boolean) => void;
  isMax?:boolean;
  isMinz?:boolean;
}


// Configure worker - REQUIRED
pdfjsLib.GlobalWorkerOptions.workerSrc = 
  `https://unpkg.com/pdfjs-dist@5.4.394/build/pdf.worker.min.mjs`;

  const PDFViewer: React.FC<ProjProps> = ({sendCloseB,isMax,isMinz,sendMaxB,sendMinz}) => {
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load PDF from file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const loadedPdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    setPdf(loadedPdf);
    setPageNum(1);
  };
  const handleOnMax = (data?:boolean) => {
    sendMaxB?.(data);
  }
  const handleOnclose =(data?: boolean)=>{
    sendCloseB?.(data);
  }
  const handleOnMinz = (data?: boolean) => {
    sendMinz?.(data);
  }
  useEffect(() => {
    const loadPdf = async () => {
      try {
        // Fetch the PDF file
        const response = await fetch(pdfFile);
        const arrayBuffer = await response.arrayBuffer();
        
        // Load PDF
        const loadedPdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        setPdf(loadedPdf);
        setPageNum(1);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPdf();
  }, []);

  // Render page when pdf or pageNum changes
  useEffect(() => {
    if (!pdf || !canvasRef.current) return;
    let renderTask: pdfjsLib.RenderTask | null = null;
    const renderPage = async () => {
      try {
        const page = await pdf.getPage(pageNum);
        const canvas = canvasRef.current!;
        const context = canvas.getContext('2d')!;
        const isPhone = window.innerWidth <= 500;
        // const viewport = page.getViewport({ scale: isPhone ? 1 : 1.5 });
        const dpr = window.devicePixelRatio || 1;

        // base scale you want visually
        const baseScale = isPhone ? 1 : 1.5;

        // scale * DPR for sharp rendering
        const viewport = page.getViewport({
            scale: baseScale * dpr,
        });

         canvas.height = viewport.height;
         canvas.width = viewport.width;

         // Set visual size
         canvas.style.width = `${viewport.width / dpr}px`;
         canvas.style.height = `${viewport.height / dpr}px`;

        ///
        renderTask = page.render({
          canvas,
          canvasContext: context,
          viewport
        });

        await renderTask.promise;

        //await page.render({ canvasContext: context,viewport,canvas}).promise;
      } catch (error:any) {
        if (error?.name === "RenderingCancelledException") {
        // Ignore — expected when switching pages quickly
        } else {
          console.error("Error rendering page:", error);
      }
      }
    };

    renderPage();
    return () => {
      if (renderTask) {
        renderTask.cancel();
      }
      };
  }, [pdf, pageNum]);


  return (
    <div className="pdf-container">
      <Windows  title='Resume' hideResizeBtn={false} isMax={isMax} isMinz={isMinz} onMinz={handleOnMinz} onClose={handleOnclose} onMax={handleOnMax} />
      <div className="pdf-wrapper">
       <div className="pdf-btns-container">        
       <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="pdf-change-btns"
        />

        {pdf && (
          <div className="pdf-btns">
            <button
              onClick={() => setPageNum(p => Math.max(1, p - 1))}
              disabled={pageNum <= 1}
              className="pdf-btns-nav"
            >
              Previous
            </button>
            <span className="px-4">
              Page {pageNum} of {pdf.numPages}
            </span>
            <button
              onClick={() => setPageNum(p => Math.min(pdf.numPages, p + 1))}
              disabled={pageNum >= pdf.numPages}
              className="pdf-btns-nav"
            >
              Next
            </button>
           </div>
          )}
          {pdf && (
            <a href={pdfFile} className='a-dl-cv' download='darylg-cv' target='_blank'>
             <button className='download-cv'>Download</button>
            </a>)}
        </div>
        <div className="pdf-content">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;


