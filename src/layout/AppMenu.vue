<script setup>
import { ref } from "vue";

import AppMenuItem from "./AppMenuItem.vue";

const model = ref([
    {
        label: "Admin",
        items: [{ label: "INICIO", icon: "pi pi-fw pi-home", to: "/" }],
    },
    {
        label: "Gestion de Productos",
        items: [
            {
                label: "Categorias",
                icon: "pi pi-fw pi-user",
                items: [
                    {
                        label: "Nueva Categoria",
                        icon: "pi pi-fw pi-times-circle",
                        to: "/categoria/nuevo",
                    },
                    {
                        label: "Lista de Categorias",
                        icon: "pi pi-fw pi-times-circle",
                        to: "/categorias",
                    },
                ],
            },
            { label: "Producto", icon: "pi pi-fw pi-id-card", to: "/producto" },

        ],
    },
    {
        label: "Gestion de Pedidos",
        items: [
            {
                label: "Lista de Pedidos",
                icon: "pi pi-fw pi-eye",
                to: "/pedido",
                badge: "NEW",
            },
            {
                label: "Nuevos Pedidos",
                icon: "pi pi-fw pi-eye",
                to: "/pedido/nuevo",
                badge: "NEW",
            },
            {
                label: "Clientes",
                icon: "pi pi-fw pi-globe",
                url: "https://www.primefaces.org/primeblocks-vue",
                target: "_blank",
            },
        ],
    },
    {
        label: "Gestion de Usuario",
        items: [
            {
                label: "Roles",
                icon: "pi pi-fw pi-prime",
                to: "/utilities/icons",
            },
            {
                label: "Usuarios",
                icon: "pi pi-fw pi-desktop",
                url: "https://www.primefaces.org/primeflex/",
                target: "_blank",
            },
        ],
    },
    {
        label: "Pages",
        icon: "pi pi-fw pi-briefcase",
        to: "/pages",
        items: [
            {
                label: "Landing",
                icon: "pi pi-fw pi-globe",
                to: "/landing",
            },
            {
                label: "Auth",
                icon: "pi pi-fw pi-user",
                items: [
                    {
                        label: "Error",
                        icon: "pi pi-fw pi-times-circle",
                        to: "/auth/error",
                    },
                    {
                        label: "Access Denied",
                        icon: "pi pi-fw pi-lock",
                        to: "/auth/access",
                    },
                ],
            },
            {
                label: "Crud",
                icon: "pi pi-fw pi-pencil",
                to: "/pages/crud",
            },
            {
                label: "Timeline",
                icon: "pi pi-fw pi-calendar",
                to: "/pages/timeline",
            },
            {
                label: "Not Found",
                icon: "pi pi-fw pi-exclamation-circle",
                to: "/pages/notfound",
            },
            {
                label: "Empty",
                icon: "pi pi-fw pi-circle-off",
                to: "/pages/empty",
            },
        ],
    },
    {
        label: "Hierarchy",
        items: [
            {
                label: "Submenu 1",
                icon: "pi pi-fw pi-bookmark",
                items: [
                    {
                        label: "Submenu 1.1",
                        icon: "pi pi-fw pi-bookmark",
                        items: [
                            { label: "Submenu 1.1.1", icon: "pi pi-fw pi-bookmark" },
                            { label: "Submenu 1.1.2", icon: "pi pi-fw pi-bookmark" },
                            { label: "Submenu 1.1.3", icon: "pi pi-fw pi-bookmark" },
                        ],
                    },
                    {
                        label: "Submenu 1.2",
                        icon: "pi pi-fw pi-bookmark",
                        items: [{ label: "Submenu 1.2.1", icon: "pi pi-fw pi-bookmark" }],
                    },
                ],
            },
            {
                label: "Submenu 2",
                icon: "pi pi-fw pi-bookmark",
                items: [
                    {
                        label: "Submenu 2.1",
                        icon: "pi pi-fw pi-bookmark",
                        items: [
                            { label: "Submenu 2.1.1", icon: "pi pi-fw pi-bookmark" },
                            { label: "Submenu 2.1.2", icon: "pi pi-fw pi-bookmark" },
                        ],
                    },
                    {
                        label: "Submenu 2.2",
                        icon: "pi pi-fw pi-bookmark",
                        items: [{ label: "Submenu 2.2.1", icon: "pi pi-fw pi-bookmark" }],
                    },
                ],
            },
        ],
    },
    {
        label: "Get Started",
        items: [
            {
                label: "Documentation",
                icon: "pi pi-fw pi-question",
                to: "/documentation",
            },
            {
                label: "View Source",
                icon: "pi pi-fw pi-search",
                url: "https://github.com/primefaces/sakai-vue",
                target: "_blank",
            },
        ],
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <li>
            <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
                <img src="/layout/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" />
            </a>
        </li>
    </ul>
</template>

<style lang="scss" scoped>

</style>
