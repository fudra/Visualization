<template>
  <div id="app">
    <div id="nav">
      <div>
        <nav class="bg-gray-800">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 text-white flex justify-center items-center">
                    <font-awesome-icon icon="car" size="lg" />
                  </div>
                </div>
                <div class="hidden md:block">
                  <div class="ml-10 flex items-baseline">
                    <router-link
                      to="/"
                      class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
                    >Home</router-link>
                    <router-link
                      to="/about"
                      class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                    >About</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <header class="bg-white shadow">
          <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <!-- Replace with your content -->
            <router-view />
            <!-- /End replace -->
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
