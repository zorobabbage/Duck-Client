import { getLink } from '@/helpers/viewblock'

const textColour = {
    pending: 'text-gray-800',
    success: 'text-green-800',
    failed: 'text-red-800'
}

const backgrounds = {
    pending: 'bg-gray-100',
    success: 'bg-green-300',
    failed: 'bg-red-300'
}

const icons = {
    pending: `<svg class="w-5 h-5 self-center ${textColour['pending']}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>`, 
    success: `<svg class="w-5 h-5 self-center ${textColour['success']}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`,
    failed: `<svg class="w-5 h-5 self-center ${textColour['failed']}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`
}





const returnNewToast = (toast, tx,  text, state) => {
    let vbLink =  "https://viewblock.io/zilliqa/"
    let txlink = ''
    if (tx) {
        try {
            vbLink = getLink(tx)
            txlink = `0x${tx.ID.slice(0, 5)}...${tx.ID.slice(tx.ID.length - 5, tx.ID.length)}`
        } catch (e) {

        }
    }

    const newInner =   `<div class="ml-auto flex flex-row items-center justify-center rounded-lg text-sm px-1  ${textColour[state]}" >
                            <a class="flex uppercase" href="${vbLink}" target="_blank">${txlink}</a>
                            <a class="flex ml-1  w-8 h-8 self-center " href="${vbLink}" target="_blank">${icons[state]}</a>
                        </div>
                        <div class="ml-1 text-md font-semibold ${textColour[state]}"> ${text}</div>`


    toast.el.classList.add("m-2", "ml-auto", "flex", "items-center", "max-w-xs", "p-4", "mb-4", "text-gray-600", "bg-white", "rounded-lg", "shadow", "min-w-min", backgrounds[state], text[state] )
    toast.el.classList.remove("toasted")
    
    toast.el.setAttribute('style', '')
    toast.el.innerHTML = newInner

    let container = document.getElementsByClassName("toasted-container top-right")[0]
    // container.classList.remove("toasted-container")
    container.classList.add("mt-12")
    // "relative", "h-full", "w-full", "z-50"
    return toast    
}

export default ({ app }, inject) => {
    inject('styleToast', (toast, text, link, icon) => returnNewToast(toast, text, link, icon))
  }