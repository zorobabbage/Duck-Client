const icons = {
    block: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>`, 
    check: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>`
}



export const returnNewToast = (toast, text, link, icon) => {
    const newInner = `<a class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8  rounded-lg" href="${link}" target="_blank">
                        ${icons[icon]}
                    </a>
                    <div class="ml-3 text-sm font-normal">${text}</div>`


    toast.el.classList.add("my-1", "flex", "items-center", "w-full", "max-w-xs", "p-4", "mb-4", "text-gray-600", "bg-white", "rounded-lg", "shadow")
    toast.el.classList.remove("toasted")
    toast.el.innerHTML = newInner


    return toast    
}

export default ({ app }, inject) => {
    inject('returnNewToast', Vue.observable({ returnNewToast: returnNewToast }))
  }