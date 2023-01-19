const invoice = require("./utils")

let total = 0;
let content = `
<div class="invoice-box" style="max-width: 800px;margin: auto;padding: 30px;border: 1px solid #eee;box-shadow: 0 0 10px rgba(0, 0, 0, .15);font-size: 16px;line-height: 24px;font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;color: #555;">
        <table cellpadding="0" cellspacing="0" style="width: 100%;line-height: inherit;text-align: left;">
            <tr class="top">
                <td colspan="2" style="padding: 5px;vertical-align: top;">
                    <table style="width: 100%;line-height: inherit;text-align: left;">
                        <tr>
                            <td class="title" style="padding: 5px;vertical-align: top;padding-bottom: 20px;font-size: 45px;line-height: 45px;color: #333;">
                                <img src="https://banner2.cleanpng.com/20190205/gqc/kisspng-computer-icons-invoice-clip-art-illustration-scala-close-the-books-faster-terminalmanager-emerson-5c595ed26cb4d9.7140607415493608504453.jpg" style="width:100%; max-width:300px;">
                            </td>
                            
                            <td style="padding: 5px;vertical-align: top;text-align: right;padding-bottom: 20px;">
                                Invoice #: ${invoice.invoice_no}<br>
                                Created: ${invoice.created_date}<br>
                                Due: ${invoice.due_date}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr class="information">
                <td colspan="2" style="padding: 5px;vertical-align: top;">
                    <table style="width: 100%;line-height: inherit;text-align: left;">
                        <tr>
                            <td style="padding: 5px;vertical-align: top;padding-bottom: 40px;">
                                ${invoice.company_name}.<br>
                                ${invoice.address}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr class="heading">
                <td style="padding: 5px;vertical-align: top;background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;">
                    Payment Method
                </td>
                
                <td style="padding: 5px;vertical-align: top;text-align: right;background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;">
                    Amount
                </td>
            </tr>`
            for (const payment of invoice.payment_methods) {
                content += `<tr class="details">
                    <td style="padding: 5px;vertical-align: top;padding-bottom: 20px;">
                        ${payment.type}
                    </td>
                    
                    <td style="padding: 5px;vertical-align: top;text-align: right;padding-bottom: 20px;">
                        $${payment.value}
                    </td>
                </tr>`
            }
            
            content += `<tr class="heading">
                <td style="padding: 5px;vertical-align: top;background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;">
                    Item
                </td>
                
                <td style="padding: 5px;vertical-align: top;text-align: right;background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;">
                    Price
                </td>
            </tr>`
            for (const item of invoice.items_description) {
                total += item.price;
                content += `
                <tr class="item">
                    <td style="padding: 5px;vertical-align: top;border-bottom: 1px solid #eee;">
                        ${item.name}
                    </td>
                    
                    <td style="padding: 5px;vertical-align: top;text-align: right;border-bottom: 1px solid #eee;">
                        $${item.price}
                    </td>
                </tr>`
            }
            content += `
            <tr class="total">
                <td style="padding: 5px;vertical-align: top;"></td>
                
                <td style="padding: 5px;vertical-align: top;text-align: right;border-top: 2px solid #eee;font-weight: bold;">
                   Total: $${total}
                </td>
            </tr>
        </table>
    </div>
`
module.exports = content;