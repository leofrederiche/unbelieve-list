import api from './api'

class App {
    constructor() {
        this.repositories = []

        this.formRepo = document.getElementById('repo-form')
        this.repoName = document.getElementById('repo-name')
        this.listRepo = document.getElementById('repo-list')

        this.registerHandlers()
        this.render();
    }

    registerHandlers() {
        this.formRepo.onsubmit = event => this.addRespository(event)
    }

    async addRespository(event){
        event.preventDefault()

        this.loading(true)

        let repo = await api.getUserInfo(this.repoName.value)
        repo = repo.data

        this.repositories.push({ 
            name: repo.name,
            description: repo.description,
            avatar_url: repo.owner.avatar_url,
            html_url: repo.html_url
        })

        this.render()
    }

    loading(state) {
        if (state == true){
            console.log('criou')
            let loadingItem = document.createElement('img')
            loadingItem.setAttribute('src', 'loading.gif')
            loadingItem.setAttribute('id', 'loading')

            this.listRepo.appendChild(loadingItem)
        } else {
            console.log('removeu')
            document.getElementById('loading').remove()
        }

    }

    render() {
        this.listRepo.innerHTML = ''

        this.loading(true)

        this.repositories.forEach(item => {
            let avatarItem = document.createElement('img')
            avatarItem.setAttribute('src', item.avatar_url)

            let titleItem = document.createElement('strong')
            titleItem.appendChild(document.createTextNode(item.name))

            let descriptionItem = document.createElement('p')
            descriptionItem.appendChild(document.createTextNode(item.description))

            let linkItem = document.createElement('a')
            linkItem.setAttribute('href', item.html_url)
            linkItem.appendChild(document.createTextNode('Acessar'))

            let listItem = document.createElement('li')

            listItem.appendChild(avatarItem)
            listItem.appendChild(linkItem)
            listItem.appendChild(titleItem)
            listItem.appendChild(descriptionItem)
            

            this.listRepo.appendChild(listItem)
        })

        this.loading(false)
    }
}

new App()