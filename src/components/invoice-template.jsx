
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function InvoiceTemplate() {
    const [isEditing, setIsEditing] = useState(true)
    const [invoiceData] = useState({
        invoiceNo: "Me/2023-24/256",
        date: "15-09-2023",
        placeOfSupply: "Madhya Pradesh (23)",
        reverseCharge: "N",
    })

    const [items, setItems] = useState([
        {
            id: 1,
            description: "Chikankari Embroidered Salwar Suit (Pink)",
            size: "S, M, L, XL",
            hsnSac: "6204",
            quantity: "24.00",
            unit: "PCS",
            price: "1899.00",
            amount: "45576.00",
        },
        {
            id: 2,
            description: "Anarkali Style Cotton Suit (Blue)",
            size: "M, L, XL",
            hsnSac: "6204",
            quantity: "12.00",
            unit: "PCS",
            price: "1499.00",
            amount: "17988.00",
        },
        {
            id: 3,
            description: "Designer Palazzo Suit (Mint Green)",
            size: "S, M, L",
            hsnSac: "6204",
            quantity: "18.00",
            unit: "PCS",
            price: "2199.00",
            amount: "39582.00",
        },
        {
            id: 4,
            description: "Heavy Work Patiala Suit (Maroon)",
            size: "M, L, XL",
            hsnSac: "6204",
            quantity: "6.00",
            unit: "PCS",
            price: "2399.00",
            amount: "14394.00",
        },
        {
            id: 5,
            description: "Printed Cotton Daily Wear Suit (Yellow)",
            size: "XS, S, M, L, XL",
            hsnSac: "6204",
            quantity: "30.00",
            unit: "PCS",
            price: "999.00",
            amount: "29970.00",
        },
    ])

    const addRow = () => {
        const newItem = {
            id: items.length + 1,
            description: "",
            size: "",
            hsnSac: "",
            quantity: "0.00",
            unit: "PCS",
            price: "0.00",
            amount: "0.00",
        }
        setItems([...items, newItem])
    }

    const updateItem = (id, field, value) => {
        setItems(
            items.map((item) => {
                if (item.id === id) {
                    const updatedItem = { ...item, [field]: value }

                    if (field === "quantity" || field === "price") {
                        const qty = Number.parseFloat(field === "quantity" ? value : updatedItem.quantity) || 0
                        const price = Number.parseFloat(field === "price" ? value : updatedItem.price) || 0
                        updatedItem.amount = (qty * price).toFixed(2)
                    }

                    return updatedItem
                }
                return item
            }),
        )
    }

    const removeRow = (id) => {
        if (items.length > 1) {
            setItems(items.filter((item) => item.id !== id))
        }
    }

    const calculateTotals = () => {
        const subtotal = items.reduce((sum, item) => sum + Number.parseFloat(item.amount || 0), 0)
        const totalQty = items.reduce((sum, item) => sum + Number.parseFloat(item.quantity || 0), 0)
        const discount = subtotal * 0.1
        const taxableAmount = subtotal - discount
        const sgst = taxableAmount * 0.06
        const cgst = taxableAmount * 0.06
        const grandTotal = taxableAmount + sgst + cgst

        return {
            subtotal: subtotal.toFixed(2),
            totalQty: totalQty.toFixed(2),
            discount: discount.toFixed(2),
            taxableAmount: taxableAmount.toFixed(2),
            sgst: sgst.toFixed(2),
            cgst: cgst.toFixed(2),
            grandTotal: grandTotal.toFixed(2),
        }
    }

    const totals = calculateTotals()

    const handleSave = () => {
        setIsEditing(false)
    }

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="bg-white">

            <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .invoice-container, .invoice-container * {
            visibility: visible;
          }
          .invoice-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
          .print-break {
            page-break-inside: avoid;
          }
        }
      `}</style>

            <div className="invoice-container max-w-4xl mx-auto p-8 bg-white">

                <div className="border-b-2 border-black pb-4 mb-6">
                    <div className="flex justify-between items-center">
                        <div className="bg-black text-white px-6 py-3 text-2xl font-bold">STRIX DIGITAL</div>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4">Invoice Template:</h2>
                </div>

                <div className="bg-gray-100 p-6 mb-6 relative">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-blue-800 mb-2">MAHAKALI ETHNIC COLLECTION</h3>
                            <p className="text-sm text-gray-600">
                                📍 Shop No. 25, Gandhi Road, Indore, MP - 452001 📞 9876543210 ✉️ mahakali.ethnic@gmail.com
                            </p>
                            <p className="text-sm text-gray-600">GSTIN: 23AABCF7521R1Z7</p>
                        </div>
                        <div className="bg-blue-600 text-white px-4 py-2 rounded">
                            <div className="text-center">
                                <div className="text-lg font-bold">M₹</div>
                                <div className="text-sm">TAX INVOICE</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-2 gap-8 mb-6">
                    <div>
                        <div className="mb-2">
                            <span className="font-semibold">Invoice No. :</span> {invoiceData.invoiceNo}
                        </div>
                        <div>
                            <span className="font-semibold">Dated :</span> {invoiceData.date}
                        </div>
                    </div>
                    <div>
                        <div className="mb-2">
                            <span className="font-semibold">Place of Supply :</span> {invoiceData.placeOfSupply}
                        </div>
                        <div>
                            <span className="font-semibold">Reverse Charge :</span> {invoiceData.reverseCharge}
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-2 gap-8 mb-6">
                    <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold mb-2">Billed to:</h4>
                        <div className="text-sm">
                            <p className="font-semibold">Fashion Paradise</p>
                            <p>32, New Market, Bhopal, MP - 462001</p>
                            <p>GSTIN / UIN : 23AABCF7521R1Z7</p>
                        </div>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold mb-2">Shipped to:</h4>
                        <div className="text-sm">
                            <p className="font-semibold">Fashion Paradise</p>
                            <p>32, New Market, Bhopal, MP - 462001</p>
                            <p>GSTIN / UIN : 23AABCF7521R1Z7</p>
                        </div>
                    </div>
                </div>


                <div className="mb-6 print-break">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2 text-left text-sm">S.N.</th>
                                <th className="border border-gray-300 p-2 text-left text-sm">DESCRIPTION OF GOODS</th>
                                <th className="border border-gray-300 p-2 text-left text-sm">SIZE</th>
                                <th className="border border-gray-300 p-2 text-left text-sm">HSN/SAC</th>
                                <th className="border border-gray-300 p-2 text-left text-sm">QTY.</th>
                                <th className="border border-gray-300 p-2 text-left text-sm">UNIT</th>
                                <th className="border border-gray-300 p-2 text-left text-sm">PRICE</th>
                                <th className="border border-gray-300 p-2 text-left text-sm">AMOUNT(₹)</th>
                                {isEditing && <th className="border border-gray-300 p-2 text-left text-sm no-print">Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="border border-gray-300 p-2 text-sm">{index + 1}</td>
                                    <td className="border border-gray-300 p-2 text-sm">
                                        {isEditing ? (
                                            <Input
                                                value={item.description}
                                                onChange={(e) => updateItem(item.id, "description", e.target.value)}
                                                className="w-full border-none p-0 text-sm"
                                            />
                                        ) : (
                                            item.description
                                        )}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-sm">
                                        {isEditing ? (
                                            <Input
                                                value={item.size}
                                                onChange={(e) => updateItem(item.id, "size", e.target.value)}
                                                className="w-full border-none p-0 text-sm"
                                            />
                                        ) : (
                                            item.size
                                        )}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-sm">
                                        {isEditing ? (
                                            <Input
                                                value={item.hsnSac}
                                                onChange={(e) => updateItem(item.id, "hsnSac", e.target.value)}
                                                className="w-full border-none p-0 text-sm"
                                            />
                                        ) : (
                                            item.hsnSac
                                        )}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-sm">
                                        {isEditing ? (
                                            <Input
                                                type="number"
                                                step="0.01"
                                                value={item.quantity}
                                                onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                                                className="w-full border-none p-0 text-sm"
                                            />
                                        ) : (
                                            item.quantity
                                        )}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-sm">
                                        {isEditing ? (
                                            <Input
                                                value={item.unit}
                                                onChange={(e) => updateItem(item.id, "unit", e.target.value)}
                                                className="w-full border-none p-0 text-sm"
                                            />
                                        ) : (
                                            item.unit
                                        )}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-sm">
                                        {isEditing ? (
                                            <Input
                                                type="number"
                                                step="0.01"
                                                value={item.price}
                                                onChange={(e) => updateItem(item.id, "price", e.target.value)}
                                                className="w-full border-none p-0 text-sm"
                                            />
                                        ) : (
                                            item.price
                                        )}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-sm font-semibold">{item.amount}</td>
                                    {isEditing && (
                                        <td className="border border-gray-300 p-2 text-sm no-print">
                                            <Button
                                                onClick={() => removeRow(item.id)}
                                                variant="destructive"
                                                size="sm"
                                                disabled={items.length === 1}
                                            >
                                                Remove
                                            </Button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                            <tr className="bg-gray-50">
                                <td colSpan="4" className="border border-gray-300 p-2 text-sm font-semibold text-right">
                                    Total
                                </td>
                                <td className="border border-gray-300 p-2 text-sm font-semibold">{totals.totalQty}</td>
                                <td className="border border-gray-300 p-2 text-sm font-semibold">PCS</td>
                                <td className="border border-gray-300 p-2 text-sm"></td>
                                <td className="border border-gray-300 p-2 text-sm font-semibold">{totals.subtotal}</td>
                                {isEditing && <td className="border border-gray-300 p-2 no-print"></td>}
                            </tr>
                        </tbody>
                    </table>

                    {isEditing && (
                        <div className="mt-4 no-print">
                            <Button onClick={addRow} variant="outline">
                                Add Row
                            </Button>
                        </div>
                    )}
                </div>


                <div className="grid grid-cols-2 gap-8 mb-6">

                    <div>
                        <div className="bg-blue-800 text-white p-3 text-center font-semibold mb-4">Invoice Summary</div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Less : Discount @ 10%</span>
                                <span>{totals.discount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Add : SGST @ 6.00%</span>
                                <span>{totals.sgst}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Add : CGST @ 6.00%</span>
                                <span>{totals.cgst}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Less : Rounded Off (-)</span>
                                <span>0.08</span>
                            </div>
                            <div className="border-t pt-2 mt-4">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Grand Total</span>
                                    <span>₹ {totals.grandTotal}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 text-sm italic">Rupees One Lakh Forty Eight Thousand Six Hundred Ninety Only</div>
                    </div>

                    <div>
                        <div className="bg-blue-800 text-white p-3 text-center font-semibold mb-4">Tax Summary</div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-2">Tax Rate</th>
                                    <th className="text-left p-2">Taxable</th>
                                    <th className="text-left p-2">CGST</th>
                                    <th className="text-left p-2">SGST</th>
                                    <th className="text-left p-2">Total Tax</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2">12%</td>
                                    <td className="p-2">{totals.taxableAmount}</td>
                                    <td className="p-2">{totals.cgst}</td>
                                    <td className="p-2">{totals.sgst}</td>
                                    <td className="p-2">
                                        {(Number.parseFloat(totals.cgst) + Number.parseFloat(totals.sgst)).toFixed(2)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                        <div className="mt-6">
                            <h4 className="font-semibold mb-2">🏦 Bank Details</h4>
                            <div className="text-sm space-y-1">
                                <p>
                                    <strong>Name:</strong> MAHAKALI ETHNIC COLLECTION
                                </p>
                                <p>
                                    <strong>A/C:</strong> 1234567890123456
                                </p>
                                <p>
                                    <strong>IFSC:</strong> SBIN0012345
                                </p>
                                <p>
                                    <strong>Bank:</strong> State Bank of India
                                </p>
                                <p>
                                    <strong>Branch:</strong> M.G. Road, Indore
                                </p>
                            </div>


                            <div className="mt-4 flex items-center gap-4">
                                <div className="w-20 h-20 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-xs text-gray-500">
                                    QR Code
                                </div>
                                <div className="text-xs">
                                    <p>📱 Scan to pay via UPI</p>
                                    <p>mahakali.ethnic@upi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-2 gap-8 mb-6 text-sm">
                    <div>
                        <h4 className="font-semibold mb-2">Terms & Conditions:</h4>
                        <ol className="space-y-1 text-xs">
                            <li>1. E & O.E.</li>
                            <li>2. Goods once sold will not be taken back.</li>
                            <li>3. Interest @ 18% p.a will be charged if the payment is not made within the stipulated time.</li>
                            <li>4. All disputes are subject to 'Indore, Madhya Pradesh' Jurisdiction only.</li>
                            <li>5. Returns accepted only within 7 days of delivery with original packaging.</li>
                        </ol>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Receiver's Signature:</h4>
                        <div className="mt-8 text-xs">
                            <p>I/We hereby confirm that I/we have received the goods as per the invoice.</p>
                            <div className="mt-8">
                                <p className="text-right">
                                    For <strong>MAHAKALI ETHNIC COLLECTION</strong>
                                </p>
                                <div className="mt-8 text-right">
                                    <p>Authorised Signatory</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="border-t-2 border-black pt-4 flex justify-between items-center">
                    <div>
                        <a href="http://www.strixdigital.in" className="text-blue-600 underline">
                            www.strixdigital.in
                        </a>
                    </div>
                    <div className="text-gray-400 italic text-lg">digital</div>
                </div>
            </div>


            <div className="flex gap-4 justify-center mt-8 no-print">
                {isEditing ? (
                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                        Save Invoice
                    </Button>
                ) : (
                    <Button onClick={handleEdit} variant="outline">
                        Edit Invoice
                    </Button>
                )}
                <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
                    Print Invoice
                </Button>
            </div>
        </div>
    )
}