import React from 'react';
import jsPDF from 'jspdf';
import logo from '../img/Unicentro-Valledupar-logo-512-lined.png';

export const Ticket = {
  
  imprimirDirectamente(numerosTickets, nombreCliente, cedulaCliente) {
    const pdf = new jsPDF('p', 'mm', [80, 80]);

    const ticketWidth = 80;
    const ticketHeight = 100;

    pdf.setFont('Arial', 'normal');
    pdf.setFontSize(12);

    numerosTickets.forEach((numeroTicket, index) => {
      if (index > 0) {
        pdf.addPage();
      }

      const imgWidth = 40;
      const imgHeight = 30;
      pdf.addImage(logo, 'JPEG', ticketWidth / 2 - imgWidth / 2, 10, imgWidth, imgHeight);

      const titleX = ticketWidth / 2;
      const titleY = 45;

      pdf.text('SORTEO ARRANCA SOBRE \n RUEDAS EL 2024', titleX, titleY, { align: 'center' });
      pdf.text('UNICENTRO VALLEDUPAR', titleX, titleY + 9, { align: 'center' });

      const clienteInfoY = titleY + 13;
      pdf.text(`Cliente: ${nombreCliente}`, titleX, clienteInfoY, { align: 'center' });
      pdf.text(`Cédula: ${cedulaCliente}`, titleX, clienteInfoY + 4, { align: 'center' });

      const numeroTicketX = ticketWidth / 2;
      const numeroTicketY = clienteInfoY + 10;

      pdf.text(`N° Ticket: ${numeroTicket.numero}`, numeroTicketX, numeroTicketY, { align: 'center' });

      const tiendaY = clienteInfoY + 13 ;
      const condicionesY = tiendaY + 5;

      pdf.text('Aplican condiciones y restricciones', titleX, condicionesY, { align: 'center' });
    });

    pdf.autoPrint();

    const newTab = window.open(pdf.output('bloburl'), '_blank');

    newTab.onload = () => {
      newTab.print();
      newTab.onafterprint = () => newTab.close();
    };
  },
};
