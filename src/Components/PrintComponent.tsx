import React from 'react';
interface PrintButtonProps {
    targetElementId: string;
    buttonText: string;
}

interface PrintComponentProps {
    children?: React.ReactNode;
}

const PrintButton: React.FC<PrintButtonProps> = ({ targetElementId, buttonText }) => {
    const handlePrint = () => {
        const targetElement = document.getElementById(targetElementId);

        if (targetElement) {
            const printWindow = window.open('', '_blank');
            printWindow?.document.write('<html><head><title>Print</title></head><body>');
            printWindow?.document.write(targetElement.innerHTML);
            printWindow?.document.write('</body></html>');
            printWindow?.document.close();
            printWindow?.print();
        }
    };

    return (
        <button onClick={handlePrint}>{buttonText}</button>
    );
};

const PrintComponent: React.FC<PrintComponentProps> = ({children}) => {
    return (
        <div>
            {/* Your content to be printed */}
            <div id="contentToPrint">
                <div>
                    {
                        children
                    }
                </div>
            </div>

            {/* Print button */}
            <PrintButton targetElementId="contentToPrint" buttonText="Print Content" />
        </div>
    );
};

export default PrintComponent;
