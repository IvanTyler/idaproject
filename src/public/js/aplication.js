console.log('js work')

const $newProductForm = document.forms.newProductForm;
const $nameProduct = document.querySelector('#nameProduct')
const $linkProduct = document.querySelector('#linkProduct')
const $priceProduct = document.querySelector('#priceProduct')

function checkEmptyForm() {
    const lengthStringNameProduct = $nameProduct.value.trim().length
    const lengthStringlinkProduct = $linkProduct.value.trim().length
    const lengthStringpriceProduct = $priceProduct.value.trim().length
    if ((lengthStringNameProduct >= 1) && (lengthStringlinkProduct >= 1) && (lengthStringpriceProduct >= 1)) {
        document.querySelector('.button-add-product').classList.add('active')
    } else {
        document.querySelector('.button-add-product').classList.remove('active')
    }
}

if ($newProductForm) {
    $newProductForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const formData = Object.fromEntries(new FormData(event.target))
        if (!$nameProduct.value) {
            $nameProduct.classList.add('error')
            document.querySelector('.error-message.nameProduct').style.opacity = '1'
        }
        if (!$linkProduct.value) {
            $linkProduct.classList.add('error')
            document.querySelector('.error-message.linkProduct').style.opacity = '1'
        }
        if (!$priceProduct.value) {
            $priceProduct.classList.add('error')
            document.querySelector('.error-message.priceProduct').style.opacity = '1'

        }

        if (($nameProduct.value) && ($linkProduct.value) && ($priceProduct.value)) {
            $nameProduct.classList.remove('error')
            console.log(formData)
        }
    })
}

$nameProduct.addEventListener('focus', () => {
    if ($nameProduct.value !== ' ') {
        $nameProduct.classList.remove('error')
        document.querySelector('.error-message.nameProduct').style.opacity = '0'
    }
})
$linkProduct.addEventListener('focus', () => {
    if ($linkProduct.value !== ' ') {
        $linkProduct.classList.remove('error')
        document.querySelector('.error-message.linkProduct').style.opacity = '0'
    }
})
$priceProduct.addEventListener('focus', () => {
    if ($priceProduct.value !== ' ') {
        $priceProduct.classList.remove('error')
        document.querySelector('.error-message.priceProduct').style.opacity = '0'
    }
})
