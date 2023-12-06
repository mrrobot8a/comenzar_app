import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const GenerarpdfTablas = {
  
    getpdfdeTabla(idTabla, titulo, logo) {

        const pdf = new jsPDF();


        
        const imgWidth = 50; 
        const imgHeight = 50; 
        const ticketWidth = pdf.internal.pageSize.getWidth();
        pdf.addImage(logo, 'JPEG', ticketWidth / 2 - imgWidth / 2, 10, imgWidth, imgHeight);
    
    
        
        const textWidth = pdf.getTextWidth(titulo);
    
   
        const marginLeft = (pdf.internal.pageSize.getWidth() - textWidth) / 2;
        pdf.text(titulo, marginLeft, 80); 
    
      
        pdf.autoTable({ html: idTabla, startY: 100 });
    
        pdf.autoPrint();
    
        const newTab = window.open(pdf.output('bloburl'), '_blank');

    }
    
}