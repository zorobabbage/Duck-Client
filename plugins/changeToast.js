import { getLink } from '@/helpers/viewblock'

const icons = {
    block: `<svg class="w-5 h-5 self-center" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>`, 
    check: `<svg class="w-5 h-5 self-center text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`
}

const returnNewToast = (toast, tx, text, icon) => {
    const vbLink = getLink(tx) || "https://viewblock.io/zilliqa/"
    let txlink = ''
    // if (tx) {
        txlink = `0x${tx.ID.slice(0, 5)}...${tx.ID.slice(tx.ID.length - 5, tx.ID.length)}`
    // }
    const newInner = `<div class="mx-auto flex flex-row items-center justify-center rounded-lg text-xs px-1" >
                        <a class="flex uppercase" href="${vbLink}" target="_blank">${txlink}</a>
                        <a class="flex ml-1  w-8 h-8 self-center " href="${vbLink}" target="_blank">${icons[icon]}</a>
                      </div>
                    <div class="ml-1 text-sm font-normal">|  ${text}</div>`


    toast.el.classList.add("my-1", "flex", "items-center", "w-full", "max-w-xs", "p-4", "mb-4", "text-gray-600", "bg-white", "rounded-lg", "shadow", "min-w-min", "absolute", "right-5", "top-5")
    toast.el.classList.remove("toasted")
    toast.el.innerHTML = newInner

    let container = document.getElementsByClassName("toasted-container top-right")[0]

    container.classList.remove("toasted-container")
    container.classList.add("relative", "h-full", "w-full", "z-50")
    // "relative", "h-full", "w-full", "z-50"
    return toast    
}

export default ({ app }, inject) => {
    inject('styleToast', (toast, text, link, icon) => returnNewToast(toast, text, link, icon))
  }