// swift-tools-version: 6.0
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "KitabooSDK_SPM",
    platforms: [
            .iOS(.v14) // Adjust the minimum deployment target as needed
            //.macOS(.v10_15)
        ],
    products: [
        // Products define the executables and libraries a package produces, making them visible to other packages.
        .library(
            name: "KitabooSDK_SPM",
            targets: ["KitabooSDK_SPM"]),
    ],
    targets: [
        // Targets are the basic building blocks of a package, defining a module or a test suite.
        // Targets can depend on other targets in this package and products from dependencies.
        
        .testTarget(
            name: "KitabooSDK_SPMTests",
            dependencies: ["KitabooSDK_SPM"]
        ),
        .binaryTarget(
                    name: "KitabooSDK_SPM",
                    path: "./Kitaboo_Reader_SDK.xcframework" // Adjust the path to your .xcframework
                )
    ]
)
