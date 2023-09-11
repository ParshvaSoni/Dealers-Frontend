import { Button } from 'antd';
import React from 'react';
interface PrintButtonProps {
    targetElementId: string;
    buttonText: string;
}

interface PrintComponentProps {
    children?: React.ReactNode;
}

const sleep = (delay:number) => new Promise((resolve) => setTimeout(resolve, delay))

const PrintButton: React.FC<PrintButtonProps> = ({ targetElementId, buttonText }) => {
    const handlePrint = () => {
        const targetElement = document.getElementById(targetElementId);

        if (targetElement) {
            const printWindow = window.open('', '_blank');
            printWindow?.document.write('<html><head><title>Print</title></head><body>');
            printWindow?.document.write(targetElement.innerHTML);
            printWindow?.document.write('</body></html>');
            printWindow?.document.close();
            sleep(1000);
            printWindow?.print();
        }
    };

    return (
        <Button type='primary' onClick={handlePrint}>{buttonText}</Button>
    );
};

const PrintComponent: React.FC<PrintComponentProps> = ({children}) => {
    return (
        <div style={{height:'max-content'}}>
            {/* Your content to be printed */}
            <div id="contentToPrint">
                    {
                        children
                    }
            </div>

            {/* Print button */}
            <PrintButton targetElementId="contentToPrint" buttonText="Print Content" />
        </div>
    );
};

export default PrintComponent;
